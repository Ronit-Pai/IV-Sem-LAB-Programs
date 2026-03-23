echo "Enter a string: "
read str
echo "Enter the character to be searched:"
read ch
res=`expr "$str" : '[^'$ch']*'$ch`
if [ $res -ne 0 ]
then
echo "Position of character $ch in a string is $res"
else
echo "Character $ch does not exists in the string."
fi

