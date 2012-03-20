@ECHO OFF
@SETLOCAL


REM ************************
REM **** Setup          ****
REM ************************

REM **** To halt the test procedure from time to time to see what's goin' on, set this to property to TRUE ****
SET DEBUG=FALSE

REM **** The JsTestDriver server settings ****
REM SET JSTESTDRIVER_SERVER=<TODO: some remote server location>

REM **** The JsTestDriver client settings ****
SET JSTESTDRIVER_PORT=4224
SET JSTESTDRIVER_VERSION=1.3.4.b
SET JSTESTDRIVER_CONFIG=js-test-driver.config.yaml
SET JSTESTDRIVER_VERBOSE=FALSE
SET JSTESTDRIVER_DEBUG=FALSE
 SET JSTESTDRIVER_RUNNERMODE=QUIET
REm SET JSTESTDRIVER_RUNNERMODE=DEBUG_OBSERVE

IF EXIST "%EXTERNAL_JSTESTDRIVER_CONFIG%" (
    SET JSTESTDRIVER_CONFIG=%EXTERNAL_JSTESTDRIVER_CONFIG%
)

REM *** Browsers (SUT)      ***
SET IE="C:\Program Files\Internet Explorer\iexplore.exe"
SET IE_x86="C:\Program Files (x86)\Internet Explorer\iexplore.exe"
SET FIREFOX="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
SET CHROME_CANARY="C:\Users\etorske\AppData\Local\Google\Chrome SxS\Application\chrome.exe"
SET CHROME="C:\Users\etorske\AppData\Local\Google\Chrome\Application\chrome.exe"

IF %DEBUG% == TRUE (
    ECHO Environment variables...

    ECHO DEBUG                   : %DEBUG%
    ECHO JSTESTDRIVER_SERVER     : %JSTESTDRIVER_SERVER%
    ECHO JSTESTDRIVER_PORT       : %JSTESTDRIVER_PORT%
    ECHO JSTESTDRIVER_HOME       : %JSTESTDRIVER_HOME%
    ECHO JSTESTDRIVER_VERSION    : %JSTESTDRIVER_VERSION%
    ECHO JSTESTDRIVER_CONFIG     : '%JSTESTDRIVER_CONFIG%'
    ECHO JSTESTDRIVER_VERBOSE    : %JSTESTDRIVER_VERBOSE%
    ECHO JSTESTDRIVER_DEBUG      : %JSTESTDRIVER_DEBUG%
    ECHO JSTESTDRIVER_RUNNERMODE : %JSTESTDRIVER_RUNNERMODE%
    PAUSE
)

REM **** JsTestDriver ****
IF NOT EXIST "%JSTESTDRIVER_HOME%" (
    GOTO jstestdriver-home-missing
)
IF NOT EXIST "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" (
    GOTO jstestdriver-jar-missing
)

IF NOT EXIST test\log (
    MKDIR test\log
)



REM *********************************************
REM **** Formal verification by JsTestDriver ****
REM *********************************************
IF %JSTESTDRIVER_VERBOSE% == TRUE (
    SET JSTESTDRIVER_COMMAND=java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" --config %JSTESTDRIVER_CONFIG% --port %JSTESTDRIVER_PORT% --runnerMode %JSTESTDRIVER_RUNNERMODE% --browser %IE% --verbose --testOutput .\test\log --tests all
    REM SET JSTESTDRIVER_COMMAND=java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" --verbose --server %JSTESTDRIVER_SERVER% --config %JSTESTDRIVER_CONFIG% --tests all
    REM IF %JSTESTDRIVER_DEBUG% == TRUE (
        REM SET JSTESTDRIVER_COMMAND=java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" --runnerMode DEBUG --verbose --server %JSTESTDRIVER_SERVER% --config %JSTESTDRIVER_CONFIG% --tests all
    REM ) ELSE (
    REM        SET JSTESTDRIVER_COMMAND=java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" --verbose --server %JSTESTDRIVER_SERVER% --config %JSTESTDRIVER_CONFIG% --tests all
    REM )
) ELSE (
    SET JSTESTDRIVER_COMMAND=java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" --config %JSTESTDRIVER_CONFIG% --port %JSTESTDRIVER_PORT% --runnerMode %JSTESTDRIVER_RUNNERMODE% --browser %IE% --testOutput .\test\log --tests all
)
ECHO Executing command %JSTESTDRIVER_COMMAND%...
IF %DEBUG% == TRUE (
    PAUSE
)
%JSTESTDRIVER_COMMAND%
GOTO end



REM ************************
REM **** Error handling ****
REM ************************
:jstestdriver-home-missing
ECHO Error: "JSTESTDRIVER_HOME" environment variable is missing (and maybe JsTestDriver installation as well...)
GOTO end

:jstestdriver-jar-missing
ECHO Error: "%JSTESTDRIVER_HOME%\JsTestDriver-%JSTESTDRIVER_VERSION%.jar" is missing - check JsTestDriver installation
GOTO end



REM ************************
REM **** The end        ****
REM ************************
:end
