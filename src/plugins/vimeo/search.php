<?php
// i'm going to be using sessions
session_start();

header('Content-Type: application/json');
require_once '../../../vendor/autoload.php';

$client_id = "1b5d944bc65987b09e509a376cc588c70d0ae123";
$client_secret = "8UAj3rne+xp+u9Bc8pJxQ9S87flIPmHHueM+eTqMchfeA/HY/TjyafvR1643BqtL90zhGk+9m+TBCQO4jpHExEHzZqv4+SY5chPQypZp1Cf7RMvRWjpmjn2QHdj57Jva";

// post vairables
$param = isset($_POST['q']) ? $_POST['q'] : '';
$token = isset($_POST['token']) ? $_POST['token'] : '';

// die early if we aren't expecteding this data
if (empty($token) || empty($param)) die("token=$token param=$param");
if (!hash_equals($_SESSION['sesskey'], $token)) die('token didnt match');

// set up the vimeo api connection
$lib = new \Vimeo\Vimeo($client_id, $client_secret);

// user may have entered a video url, so extract the video id from it, see https://stackoverflow.com/a/17030234
if (strpos($param,'/') !== false && strpos($param,'vimeo') !== false) {
	preg_match('#(?:https?://)?(?:www.)?(?:player.)?vimeo.com/(?:[a-z]*/)*([0-9]{6,11})[?]?.*#', $param, $matches);
	if (isset($matches[1])) {
		$queryResponse = $lib->request('/videos/' . $matches[1]);
	}
} else {
	$queryResponse = $lib->request('/videos', ['per_page' => 20, 'query' => $param, 'sort' => 'relevant'], 'GET');
}

$response = new stdClass();
if (isset($queryResponse['body'])) {
	if (isset($queryResponse['body']['paging'])) {
		$response->pageInfo = [
			"prev" => $queryResponse['body']['paging']['previous'],
			"next" => $queryResponse['body']['paging']['next'],
			"total" => $queryResponse['body']['total'],
			"size" => $queryResponse['body']['per_page'],
		];
	}
	$results = [];
	if (isset($queryResponse['body']['data'])) {
		$datasrc = $queryResponse['body']['data'];
	} else {
		$datasrc = [$queryResponse['body']];
	}
	foreach ($datasrc as $video) {
		$results[] = [
			"id" => str_replace("/videos/",'', $video['uri']),
			"title" => $video['name'],
			"published" => $video['release_time'],
			"channel" => $video['user']['name'],
			"thumbnail" => $video['pictures']['sizes'][2]['link'],
			"duration" => $video['duration'],
		];
	}
	$response->results = $results;
}
echo json_encode($response, JSON_PRETTY_PRINT);