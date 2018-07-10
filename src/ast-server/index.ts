import {
  createConnection,
  ProposedFeatures,
  InitializeParams,
  CancellationToken,
  DidChangeConfigurationNotification
} from 'vscode-languageserver';

console.log("ast-loader is loaded");

function serverStart() {
  // const ts = modules.typescript;
  console.log("ast-loader is running");

  let connection = createConnection(ProposedFeatures.all);

  let hasConfigurationCapability: boolean = false;
  let hasWorkspaceFolderCapability: boolean = false;
  let hasDiagnosticRelatedInformationCapability: boolean = false;

  connection.onInitialize((params: InitializeParams, token: CancellationToken) => {
    console.log("check input params");
    console.log(params.capabilities);
    return {
      capabilities: {

      }
    };
  });

  connection.onInitialized(() => {
    if (hasConfigurationCapability) {
      // Register for all configuration changes.
      connection.client.register(
        DidChangeConfigurationNotification.type,
        undefined
      );
    }
    if (hasWorkspaceFolderCapability) {
      connection.workspace.onDidChangeWorkspaceFolders(_event => {
        connection.console.log('Workspace folder change event received.');
      });
    }
  });

  connection.listen();

}

serverStart();
