echo "Enter a string: "
read str

if [ -z "$str" ]
then
echo "Invalid String"
else
echo "Length of string: "
z=`expr "$str" : '.*'`
echo $z
if [ $z -ge 6 ]
then
echo "First 3 character substring is "
l=`expr "$str" : '\(...\).*'`
echo $l
echo "Last 3 character substring is "
f=`expr "$str" : '.*\(...\)'`
echo $f

else 
echo "String length is less than 6 characters"
fi
fi

echo "Enter the character to be searched:"
read ch
res=`expr "$str" : '[^'$ch']*'$ch`
if [ $res -ne 0 ]
then
echo "Position of character $ch in a string is $res"
else
echo "Character $ch does not exists in the string."
fi

