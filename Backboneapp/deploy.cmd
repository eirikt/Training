@ECHO OFF
@SETLOCAL

RMDIR /S /Q C:\Temp\MyBackboneApp

MKDIR C:\Temp\MyBackboneApp

XCOPY /Y /F .\web.config C:\Temp\MyBackboneApp\
XCOPY /Y /F .\index.html C:\Temp\MyBackboneApp\
XCOPY /Y /F .\app_data.json C:\Temp\MyBackboneApp\
XCOPY /Y /S /I /F .\Scripts C:\Temp\MyBackboneApp\Scripts
XCOPY /Y /S /I /F .\Styles C:\Temp\MyBackboneApp\Styles
