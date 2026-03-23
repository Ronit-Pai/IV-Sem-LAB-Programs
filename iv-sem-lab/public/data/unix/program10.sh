if [ $# -eq 0 ]; then
	echo "Usage: $0 <path>"
	exit 1
fi

for path in "$@"; do
	mkdir -p "$path"
	echo "Created directories for path: $path"
done
