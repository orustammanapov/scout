// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ExampleViewProvider } from './sidebar';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// console.log(fs.readFileSync(__dirname));

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scout" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('scout.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('BUYUY World from scout!');		
	});

	let myTest = vscode.commands.registerCommand('scout.myTest', () => {

		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('THE BEST MESSAGE EVER!!');

		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{
				// Only allow the webview to access resources in our extension's media directory
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
			}
		  );
	
		//   const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'cat.gif'));
		//   const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
	
		panel.webview.html = getWebviewContent();
	});

	// vscode.window.createTreeView('exampleView', {
	// 	treeDataProvider: new ExampleViewProvider(),
	// });

	vscode.window.registerTreeDataProvider(
		'firstView',
		new ExampleViewProvider(),
	);

	vscode.window.registerTreeDataProvider(
		'secondView',
		new ExampleViewProvider(),
	);

	vscode.window.registerTreeDataProvider(
		'thirdView',
		new ExampleViewProvider(),
	);


	context.subscriptions.push(disposable);
	context.subscriptions.push(myTest);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	  <h1 id="lines-of-code-counter">0</h1>
  
	  <script>
		  const counter = document.getElementById('lines-of-code-counter');
  
		  let count = 0;
		  setInterval(() => {
			  counter.textContent = count++;
		  }, 100);
	  </script>
  </body>
  </html>`;
}


// this method is called when your extension is deactivated
export function deactivate() {}
