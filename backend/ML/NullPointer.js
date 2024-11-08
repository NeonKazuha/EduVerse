import { exec } from "child_process"
// Function to upload a file using curl command
function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}

// Async function to upload a file using curl command
function convertWindowsPathToWSL(filePath) {

  // Convert drive letter to lowercase and replace backslashes with forward slashes
  const wslPath = filePath.replace(/^([A-Z]):\//i, (match, driveLetter) => `/mnt/${driveLetter.toLowerCase()}/`).replace(/\//g, '/');

  //console.log(wslPath);
  return wslPath;
}
async function uploadFileWithCurl(filePath) {
  const convertedFilePath = convertWindowsPathToWSL(filePath);

  const curlCommand = `wsl curl -F'file=@${convertedFilePath}' https://0x0.st`;

  try {
    const stdout = await execAsync(curlCommand);
    //console.log('File uploaded successfully:', stdout);
    return stdout;

  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export { uploadFileWithCurl };
