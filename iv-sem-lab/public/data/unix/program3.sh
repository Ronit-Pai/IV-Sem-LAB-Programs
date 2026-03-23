echo "Enter the year: "
read year

if [ $(expr $year % 4) -ne 0 ]; then
	echo "$year is not a leap year"
elif [ $(expr $year % 100) -ne 0 ]; then
	echo "$year is a leap year"
elif [ $(expr %year % 400) -eq 0 ]; then
	echo "$year is a leap year"
else
	echo "$year is not a leap year"
fi

