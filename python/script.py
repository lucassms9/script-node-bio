import sys, json

def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])
def main():
    lines = read_in()

    with open('data.txt', 'w') as outfile:
        json.dump(lines, outfile)

    print('positivo')
    
if __name__ == '__main__':
    main()