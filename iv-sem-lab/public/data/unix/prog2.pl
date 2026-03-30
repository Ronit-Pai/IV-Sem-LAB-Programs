#!/usr/bin/perl

foreach $num (@ARGV){
	$sum = 0;
	$a=$num;
	while($a!=0){
		$r=($a%10);
		$sum=($sum+$r);
		$a = ($a/10);
	}
	print "\n Sum of digits in $num is : $sum "
}
