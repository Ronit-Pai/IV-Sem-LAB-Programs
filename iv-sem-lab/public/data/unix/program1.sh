echo "Enter 3 numbers: "
read a
read b
read c
 
if [ $a -ge $b ] && [ $a -ge $c ]; then
echo "$a is greater" 
elif [ $b -ge $a ] && [ $b -ge $c ]; then
echo "$b is greater"
else
echo "$c is greater"
fi

if [ $a -le $b ] && [ $a -le $c ]; then
echo "$a is smaller" 
elif [ $b -le $a ] && [ $b -le $c ]; then
echo "$b is smaller"
else
echo "$c is smaller"
fi


