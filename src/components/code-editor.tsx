import './code-editor.css'
import MonacoEditor, { OnChange } from '@monaco-editor/react'

interface CodeEditorProps {
    initialValue: string;
    onChange: OnChange
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    return (
        <div className="editor-wrapper">
            <MonacoEditor
                onChange={onChange}
                value={initialValue}
                theme='vs-dark'
                height='100%'
                language='javascript'
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
}

export default CodeEditor