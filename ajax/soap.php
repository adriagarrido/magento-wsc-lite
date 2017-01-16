<?php header('Content-Type: application/json');

$post = json_decode($_POST['requestData']);

$client = new SoapClient($post->connection->url.'api/?wsdl');
$session = $client->login($post->connection->username, $post->connection->password);
$result = $client->call($session, $post->resource.'.'.$post->method, array($post->args));
$client->endSession($session);
echo json_encode($result);
