echo "Enter the value of n: "
read n
echo "Enter the value of m: "
read m

if [ $m -eq 0 ]
then
	echo "Division by zero is not allowed."
else
	remainder=$(expr $n % $m)
	
	if [ $remainder -eq 0 ]
	then
		echo "$n is divisible by $m"
	else
		echo "$n is not divisible by $m"
	fi
fi
