"""
Gunde Me - Local & Mobile Educational Web Server
Serves Kurdish interactive village learning experience across PC and mobile devices.
"""
import http.server
import socketserver
import os
import socket

PORT = 8086
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_wifi_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    wifi_ip = get_wifi_ip()
    socketserver.TCPServer.allow_reuse_address = True
    print(f"===========================================================", flush=True)
    print(f"  Gunde Me - Kurdish Village Interactive Experience", flush=True)
    print(f"  Local PC URL:      http://127.0.0.1:{PORT}/standalone.html", flush=True)
    print(f"  Mobile / iPad URL: http://{wifi_ip}:{PORT}/standalone.html", flush=True)
    print(f"===========================================================", flush=True)

if __name__ == "__main__":
    run()
