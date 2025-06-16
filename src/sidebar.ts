import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ExampleViewProvider implements vscode.TreeDataProvider<SidebarItem> {
    onDidChangeTreeData?: vscode.Event<void | SidebarItem | SidebarItem[] | null | undefined> | undefined;
    
    list: SidebarItem[];

    constructor() {
        const first = new SidebarItem('First', '1.0.1', vscode.TreeItemCollapsibleState.None);

        /**
         * TreeItem Events
         * 
         * onDidChangeSelection: Event<TreeViewSelectionChangeEvent<T>>
         * onDidChangeVisibility: Event<TreeViewVisibilityChangeEvent>
         * onDidCollapseElement: Event<TreeViewExpansionEvent<T>>
         * onDidExpandElement: Event<TreeViewExpansionEvent<T>>
         */

        // first.on

        this.list = [
            first,
            new SidebarItem('First', '1.0.1', vscode.TreeItemCollapsibleState.None),
            new SidebarItem('Second', '2.0.1', vscode.TreeItemCollapsibleState.Expanded),
            new SidebarItem('Third', '1.1.*', vscode.TreeItemCollapsibleState.Collapsed),
            new SidebarItem('Fourth', '1.2.5', vscode.TreeItemCollapsibleState.Collapsed),
        ];
    }

    getTreeItem(element: SidebarItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
        // throw new Error('Method not implemented.');
        /**
         * return new Dependency(
         *   moduleName,
         *   version,
         *   vscode.TreeItemCollapsibleState.Collapsed|None|Expanded
         * );
         */
    }
    
    getChildren(element?: SidebarItem | undefined): vscode.ProviderResult<SidebarItem[]> {
        // throw new Error('Method not implemented.');
        if (element === undefined) {
            return Promise.resolve(this.list);
        }
        return Promise.resolve([]);
    }
    
    getParent?(element: SidebarItem): vscode.ProviderResult<SidebarItem> {
        // throw new Error('Method not implemented.');
        return element;
    }
    
    resolveTreeItem?(item: vscode.TreeItem, element: SidebarItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }
}

class SidebarItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
  
    iconPath = {
        light: path.join(__filename, '..', '..', 'img', 'database-container.svg'),
        dark: path.join(__filename, '..', '..', 'img', 'database-container.svg'),
    };
}
  