'use client';

import { Input } from 'antd';
import { useState, useEffect } from 'react';

const { TextArea } = Input;

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <TextArea
        value={localValue}
        onChange={handleChange}
        placeholder="Enter SDUI JSON schema"
        rows={15}
        style={{
          fontFamily: 'monospace',
          fontSize: '13px',
        }}
        status={error ? 'error' : undefined}
      />
      {error && (
        <div style={{ color: '#ff4d4f', marginTop: '8px', fontSize: '14px' }}>
          {error}
        </div>
      )}
    </div>
  );
}
