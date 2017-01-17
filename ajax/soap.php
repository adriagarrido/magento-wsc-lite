<?php header('Content-Type: application/json');

$post = json_decode($_POST['requestData'], true);

try {
    $client = new SoapClient($post['connection']['magentohost'].'api/?wsdl');
    $session = $client->login($post['connection']['apiUser'], $post['connection']['apiKey']);
    $result = $client->call($session, $post['resource'].'.'.$post['method'], $post['args']);
    $client->endSession($session);
    $response = json_encode($result);
} catch (Exception $e) {
    $response = $e->getMessage();
}
echo $response;
