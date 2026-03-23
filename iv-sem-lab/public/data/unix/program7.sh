if [ $# -eq 0 ]; then
echo "No arguments provided!"
exit 1
fi

echo "Arguments in the same order: $@"

echo "Arguments in reverse order: "
for (( i=$#; i>=1; i--))
do
eval echo \${$i}
done 
echo


