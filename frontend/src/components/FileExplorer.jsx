import React from 'react'

const FileExplorer = (props) => {
    return (
        <>
            <div className="explorer h-full w-64 border-r border-gray-800 bg-gray-900 flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                    <span className="text-xs font-semibold text-gray-400">FILES</span>
                    <div className="flex gap-2 text-gray-400">
                        <button onClick={() => setCreationMode('file')} className="hover:text-white transition-colors"><i className="ri-file-add-line"></i></button>
                        <button onClick={() => setCreationMode('folder')} className="hover:text-white transition-colors"><i className="ri-folder-add-line"></i></button>
                    </div>
                </div>
                <div className="file-tree w-full p-2 space-y-1 overflow-auto">
                    {props.creationMode && (
                        <div className="p-2 px-3 flex items-center gap-2 rounded-md w-full bg-gray-800">
                            {props.creationMode === 'folder' ? <i className="ri-folder-line text-yellow-500"></i> : <i className="ri-file-code-line text-blue-400"></i>}
                            <input
                                autoFocus
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                onBlur={() => setCreationMode(null)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCreateNewItem();
                                    if (e.key === 'Escape') setCreationMode(null);
                                }}
                                className="bg-transparent text-sm text-white font-sans outline-none w-full"
                            />
                        </div>
                    )}
                    {Object.keys(props.fileTree).map((file, index) => {
                        const isFolder = props.fileTree[file].directory;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (isFolder) return;
                                    props.setCurrentFile(file);
                                    props.setOpenFiles([...new Set([...props.openFiles, file])]);
                                }}
                                className={`tree-element cursor-pointer p-2 px-3 flex items-center gap-2 rounded-md w-full text-left transition-all duration-150 ${props.currentFile === file ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"}`}
                            >
                                {isFolder ? <i className="ri-folder-line text-lg text-yellow-500"></i> : <i className="ri-file-code-line text-lg text-blue-400"></i>}
                                <p className="font-sans text-sm font-medium truncate">
                                    {file}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default FileExplorer