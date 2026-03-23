echo "Choose your option: \n\t+ : Addition\n\t- : Subtraction\n\t* : Multiplication\n\t/ : Division\n"
echo "Enter your choice: "
read ch
read -p "Enter two numbers: " a b

case $ch in 
'+') y=`expr $a + $b`
echo "Sum of $a and $b = $y";;
'-') y=`expr $a - $b`
echo "Difference of $a and $b = $y";;
'*') y=`expr $a \* $b`
echo "Product of $a and $b = $y";;
'/') 
	if [ $b -eq 0 ]
	then
		echo "Division by zero not possible "
	else
		y=`expr $a / $b`
		echo "Quotient of $a and $b = $y"
	fi;;
*) echo "Invalid choice";;
esac 
