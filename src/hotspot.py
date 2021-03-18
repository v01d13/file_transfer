import os
import pip


def win_hotspot():
    try:
        import win32com.shell.shell as shell
    except ImportError:
        pip.main(['install', 'pywin32'])
    cmd_set = "netsh wlan set hostednetwork mode=allow ssid=File_Transfer key=12345678"
    cmd_run = "netsh wlan start hostednetwork"
    shell.ShellExecuteEx(lpVerb='runas', lpFile='cmd.exe',
                         lpParameters='/c ' + cmd_set)
    shell.ShellExecuteEx(lpVerb='runas', lpFile='cmd.exe',
                         lpParameters='/c ' + cmd_run)


def linux_hotspot():
    try:
        from PyAccessPoint import pyaccesspoint
    except ImportError:
        pip.main(['install', 'pyaccesspoint'])
    ap = pyaccesspoint.AccessPoint(
        wlan='wlp3s0', ssid='File_Transfer', password='12345678')
    if (not ap.is_running()):
        ap.start()


if (os.name == 'nt'):
    win_hotspot()
else:
    linux_hotspot()
