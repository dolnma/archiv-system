<?
$host = '192.168.31.89';
$ping = new Ping($host);
$latency = $ping->ping();
if ($latency !== false) {
 print 'Latency is ' . $latency . ' ms';
}
else {
print 'Host could not be reached.';
}

// function pingAddress($ip) {
//     $pingresult = exec("/bin/ping -n 3 $ip", $outcome, $status);
//     if (0 == $status) {
//         $status = "alive";
//     } else {
//         $status = "dead";
//     }
//     echo "The IP address, $ip, is  ".$status;
// }

// pingAddress("192.168.31.89");
?>