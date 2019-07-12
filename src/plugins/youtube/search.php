<?php
// i'm going to be using sessions
session_start();

header('Content-Type: application/json');
require_once '../../../vendor/autoload.php';

// post vairables
$param = isset($_POST['q']) ? $_POST['q'] : '';
$token = isset($_POST['token']) ? $_POST['token'] : '';

// die early if we aren't expecteding this data
if (empty($token) || empty($param)) die("token=$token param=$param");
if (!hash_equals($_SESSION['token'], $token)) die('token didnt match');

// user may have entered a video url, so extract the video id from it, see https://stackoverflow.com/a/17030234
if (strpos($param,'/') !== false && strpos($param,'yout') !== false) {
	preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $param, $matches);
	if (isset($matches[1])) {
		$param = $matches[1];
	}
}

// set up the google client and apikey
$client = new Google_Client();
$client->setApplicationName("Video 2 Scorm");
$client->setDeveloperKey("AIzaSyAYpGcgNMRVkJ5aLyxDX6SN6X03KaMaUqA");
$service = new Google_Service_YouTube($client);

// check if we have a reference to a single video by trying to list the query as a video
$queryResponse = $service->videos->listVideos('snippet', [
	"id" => $param,
]);

if ($queryResponse->pageInfo->totalResults === 1) {
	// we found one video
} else {
	// requery as a search
	$queryResponse = $service->search->listSearch('snippet', [
	    'maxResults' => 20,
	    'order' => 'relevance',
	    'q' => $param,
	    'type' => 'video',
	    'videoEmbeddable' => 'true'
	]);
}

// queryResponse is a snippet even if its empty, so we can rely on these values being defined
$response = new stdClass();
$response->pageInfo = [
	"prev" => $queryResponse->prevPageToken,
	"next" => $queryResponse->nextPageToken,
	"total" => $queryResponse->pageInfo->totalResults,
	"size" => $queryResponse->pageInfo->resultsPerPage,
];
$results = [];
$durations = [];
foreach ($queryResponse->items as $video) {
	$id = isset($video->id->videoId) ? $video->id->videoId : $video->id;
	$durations[] = $id;
	$results[] = [
		"id" => $id,
		"title" => $video->snippet->title,
		"published" => $video->snippet->publishedAt,
		"channel" => $video->snippet->channelTitle,
		"thumbnail" => "https://i.ytimg.com/vi/{$id}/mqdefault.jpg",
		"duration" => 0, // youtube requires a seperate query to find out duration
	];
}
$response->results = $results;

// now look up durations for all the results
$column = array_column($response->results,'id');
$queryParams = [
	'id' => implode(',',$durations)
];
$durations = $service->videos->listVideos('contentDetails', $queryParams);
foreach ($durations->items as $result) {
	$key = array_search($result->id, $column);
	$response->results[$key]['duration'] = rfc3339_to_seconds($result->contentDetails->duration);
}

function rfc3339_to_seconds($timestring) {
	$time = new DateTime('@0'); // Unix epoch
	$time->add(new DateInterval($timestring));
	return (int) $time->format('U');
}

// you can view the video thumbnail at https://i.ytimg.com/vi/video_id/default.jpg" @ 120x90
echo json_encode($response,JSON_PRETTY_PRINT);
/*

{
 "kind": "youtube#videoListResponse",
 "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/9AWoiVeyTkga2N3yOA2U9yaHdb8\"",
 "pageInfo": {
  "totalResults": 3,
  "resultsPerPage": 3
 },
 "items": [
  {
   "kind": "youtube#video",
   "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/bWiFWRVFCzpSA7kbMklqZfdpS1o\"",
   "id": "Ks-_Mh1QhMc",
   "contentDetails": {
    "duration": "PT21M3S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "true",
    "licensedContent": true,
    "projection": "rectangular"
   }
  },
  {
   "kind": "youtube#video",
   "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/fXhor9WSuZFnAwxaB7__vgP-bvk\"",
   "id": "c0KYU2j0TM4",
   "contentDetails": {
    "duration": "PT19M5S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "true",
    "licensedContent": true,
    "projection": "rectangular"
   }
  },
  {
   "kind": "youtube#video",
   "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/sN56l7iwL13CULNdNMBEwqp-W9o\"",
   "id": "eIho2S0ZahI",
   "contentDetails": {
    "duration": "PT9M59S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "true",
    "licensedContent": true,
    "projection": "rectangular"
   }
  }
 ]
}
*/