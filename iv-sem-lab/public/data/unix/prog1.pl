#!/usr/bin/perl
print "\n Enter the input string : ";
$a = <STDIN>;

print "\nEnter the total number of times the string to be displayed : ";

chop ($b = <STDIN>);

$c=$a x $b;
print "Result : $c";
