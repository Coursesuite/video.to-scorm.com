<?php
$url = 'https://cms.api.brightcove.com/v1/accounts/'.$_POST['accountId'].'/videos/'.$_POST['videoId'].'/sources';
$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$_POST['token'], 'Content-Type : application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$response = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);
echo($response);