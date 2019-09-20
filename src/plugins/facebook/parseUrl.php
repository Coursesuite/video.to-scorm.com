<?php
$url = $_POST['url'];
$context = [
  'http' => [
    'method' => 'GET',
    'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.47 Safari/537.36",
    ],
];
$context = stream_context_create($context);
$data = file_get_contents($url, false, $context);

$regex = '/hd_src_no_ratelimit:"([^"]+)"/';
if (preg_match($regex, $data, $match)) {
    echo($match[1]);
} else {
    $regex = '/sd_src_no_ratelimit:"([^"]+)"/';
    if (preg_match($regex, $data, $match)) {
        echo($match[1]);
    } else {
      echo('something went wrong');
    }
}