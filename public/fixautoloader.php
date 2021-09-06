<?php
// imho this is easier that mucking about in awk and sed and find
$iter = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator(".")), '/.*\.php$/', RecursiveRegexIterator::GET_MATCH);
foreach ($iter as $file) {
	$contents = file_get_contents($file[0]);
	if (strpos($contents, "'../../../vendor/autoload.php'") !== -1) {
		$contents = str_replace("'../../../vendor/autoload.php'","'../../../../vendor/autoload.php'",$contents);
		file_put_contents($file[0], $contents);
	}
}