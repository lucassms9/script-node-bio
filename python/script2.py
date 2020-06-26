import sys, json

def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def teste(a):
  
  lines = read_in()

  total_sum_inArray = 0

  for item in lines:
      total_sum_inArray += item.Wavenumber

  print(total_sum_inArray)
   