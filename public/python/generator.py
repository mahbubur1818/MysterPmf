import sys
import qrcode
from PIL import Image

try:
  text = sys.argv[1]
  color = sys.argv[2]
  f=open('./public/python/log.txt','r')
  qrNo = f.read()

  qrNo = int(qrNo) + 1
  f.close()
  f=open('./public/python/log.txt','w')
  f.write(str(qrNo))
  f.close()

  qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=5)

  qr.add_data(text)
  qr.make(fit=True)
  img = qr.make_image(fill=color, back_color='white')
  path='qrCode/Qr-Code-'+str(qrNo)+'-m.Pmf'+ '.png'
  img.save('./public/python/' + path)

except Exception as e:
  print(str(e))
  sys.stdout.flush()
print(path)
sys.stdout.flush()