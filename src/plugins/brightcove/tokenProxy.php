<?php
/**
 * access-token-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token and returns it
 * Accessing:
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} client_id - OAuth2 client id with sufficient permissions for the request
 * @post {string} client_secret - OAuth2 client secret with sufficient permissions for the request
 *
 * @returns {string} $response - JSON response received from the OAuth API
 */


// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// note that if you are using this proxy for a single credential
// you can just hardcode the client id and secret below instead of passing them

$client_id     = 'e754600a-667f-4a89-8c08-afd9364f9bb7';
$client_secret = 'SEcSAp6McVPL4Y2zOo0q1AquFGIOdrmcbuu6P_FkR0TQ0ANYp4GgtmgFH-_1odSRkFgdpuUAiABaf2J0o_6pQQ';
$auth_string   = "{$client_id}:{$client_secret}";
$request       = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
$ch            = curl_init($request);
curl_setopt_array($ch, array(
        CURLOPT_POST           => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_USERPWD        => $auth_string,
        CURLOPT_HTTPHEADER     => array(
            'Content-type: application/x-www-form-urlencoded',
        )
    ));
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
    echo 'An error occurred';
} else {
  echo $response;
}