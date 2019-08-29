<?php
include_once 'Dailymotion.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$api = new Dailymotion();
$result = $api->get(
    '/videos',
    array('fields' => array('id', 'title', 'duration', 'embed_url', 'thumbnail_720_url', 'channel.name', 'created_time', 'media_type'),
          'search' => $_POST['query'],
          'limit'  => 20)
);
echo json_encode($result, JSON_PRETTY_PRINT);