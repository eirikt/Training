@ECHO OFF
@SETLOCAL

RMDIR /S /Q C:\Temp\MyBackboneApp

MKDIR C:\Temp\MyBackboneApp

XCOPY /Y /F .\web.config C:\Temp\MyBackboneApp\
XCOPY /Y /F .\index.html C:\Temp\MyBackboneApp\
XCOPY /Y /F .\app_data.json C:\Temp\MyBackboneApp\
XCOPY /Y /S /I /F .\js C:\Temp\MyBackboneApp\js
XCOPY /Y /S /I /F .\css C:\Temp\MyBackboneApp\css
