'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge' // (你需要安装: npx shadcn@latest add badge)

// --- API 调用函数 ---
// 获取密钥状态
const getKeyStatus = async () => {
  const res = await fetch('/api/user/key-status'); // 调用 BFF
  if (!res.ok) {
    throw new Error('无法获取密钥状态');
  }
  return res.json(); // 返回 { is_set: boolean }
}

// 保存密钥
const saveApiKey = async (apiKey: string) => {
  const res = await fetch('/api/user/key', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || '保存失败');
  }
  return res.json();
}
// --------------------


export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const queryClient = useQueryClient();

  // 1. 使用 useQuery 获取当前密钥状态
  const { data: statusData, isLoading: isStatusLoading } = useQuery({
    queryKey: ['api-key-status'],
    queryFn: getKeyStatus,
  });

  // 2. 使用 useMutation 保存新密钥
  const mutation = useMutation({
    mutationFn: saveApiKey,
    onSuccess: () => {
      toast.success('API 密钥已成功保存！');
      // 成功后，立即让 "api-key-status" 缓存失效，触发 useQuery 重新获取数据
      queryClient.invalidateQueries({ queryKey: ['api-key-status'] });
      setApiKey(''); // 清空输入框
    },
    onError: (error: any) => {
      toast.error('保存失败', { description: error.message });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      toast.warning('请输入您的 API 密钥');
      return;
    }
    mutation.mutate(apiKey);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>API 密钥管理</CardTitle>
          <CardDescription>
            请输入您自己的 DeepSeek API 密钥。您的密钥将被加密存储，仅用于驱动您的 AI 请求。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>当前状态:</Label>
            {isStatusLoading ? (
              <p>正在检查...</p>
            ) : (
              statusData?.is_set ? (
                 <Badge variant="default" className="bg-green-600">已设置</Badge>
              ) : (
                 <Badge variant="destructive">未设置</Badge>
              )
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">DeepSeek API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
               <p className="text-sm text-muted-foreground">
                您的密钥仅在保存时传输一次，我们不会再次显示它。
              </p>
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? '保存中...' : '保存密钥'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}