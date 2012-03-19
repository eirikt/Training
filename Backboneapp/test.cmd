@ECHO OFF
@SETLOCAL


REM ***************************
REM *** JsTestDriver config ***
REM ***************************
SET JSTESTDRIVER="%JSTESTDRIVER_HOME%\JsTestDriver-1.3.4.b.jar"
SET JSTESTDRIVER_CONFIG="js-test-driver.yaml"
SET PORT=4224
SET RUNNER_MODE=INFO


REM ***************************
REM *** Browsers (SUT)      ***
REM ***************************
SET IE="C:\Program Files\Internet Explorer\iexplore.exe"
SET IE_x86="C:\Program Files (x86)\Internet Explorer\iexplore.exe"

SET FIREFOX="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"

SET CHROME_CANARY="C:\Users\etorske\AppData\Local\Google\Chrome SxS\Application\chrome.exe"
SET CHROME="C:\Users\etorske\AppData\Local\Google\Chrome\Application\chrome.exe"
REM SET CHROME_OLD_VERSION="C:\Users\etorske\AppData\Local\Google\Chrome\Application\old_chrome.exe"


REM **********************************************************
REM *** JsTestDriver server/client one-stop-shop-execution ***
REM **********************************************************
REM JsTestDriver server command
REM java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-1.3.4.b.jar" --port 4224 --config js-test-driver.yaml --runnerMode INFO --captureConsole --browser "C:\Users\etorske\AppData\Local\Google\Chrome SxS\Application\chrome.exe"

REM JsTestDriver client command
REM java -jar "%JSTESTDRIVER_HOME%\JsTestDriver-1.3.4.b.jar" --tests all

REM JsTestDriver one-stop-shop server and client command (see http://code.google.com/p/js-test-driver/wiki/ContinuousBuild)
java -jar %JSTESTDRIVER% --config %JSTESTDRIVER_CONFIG% --port %PORT% --runnerMode %RUNNER_MODE% --browser %IE_x86%,%FIREFOX%,%CHROME%,%CHROME_CANARY% --verbose --tests all
