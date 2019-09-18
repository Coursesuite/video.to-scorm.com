<?php
include_once 'Dailymotion.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$api = new Dailymotion();

if (!strpos($_POST['query'], 'www.dailymotion.com')) {
  // Search query
  $result = $api->get(
      '/videos',
      array('fields' => array('id', 'title', 'duration', 'embed_url', 'thumbnail_720_url', 'channel.name', 'created_time', 'media_type'),
            'search' => $_POST['query'],
            'limit'  => 20)
  );
  echo json_encode($result, JSON_PRETTY_PRINT);
} else {
  // Direct video url, extract id
  $end = explode('/video/',$_POST['query'])[1];
  $id = explode('?', $end)[0];
  $result = $api->get(
      '/video/'.$id,
      array('fields' => array('id', 'title', 'duration', 'embed_url', 'thumbnail_720_url', 'channel.name', 'created_time', 'media_type'))
  );
  echo json_encode($result, JSON_PRETTY_PRINT);
}
