'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Key, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

interface ApiKeySettingsProps {
  onApiKeySet?: (isSet: boolean) => void
}

export default function ApiKeySettings({ onApiKeySet }: ApiKeySettingsProps) {
  const [apiKey, setApiKey] = useState('')
  const [confirmApiKey, setConfirmApiKey] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showConfirmApiKey, setShowConfirmApiKey] = useState(false)
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 检查API密钥状态
  const checkApiKeyStatus = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/user/key-status')
      if (res.ok) {
        const data = await res.json()
        setIsApiKeySet(data.is_set)
        onApiKeySet?.(data.is_set)
      }
    } catch (error) {
      console.error('Failed to check API key status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 组件加载时检查API密钥状态
  useEffect(() => {
    checkApiKeyStatus()
  }, [])

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault()

    // 验证输入
    if (!apiKey.trim()) {
      toast.error('请输入API密钥')
      return
    }

    if (apiKey !== confirmApiKey) {
      toast.error('两次输入的API密钥不一致')
      return
    }

    // 验证DeepSeek API密钥格式（以sk-开头）
    if (!apiKey.startsWith('sk-')) {
      toast.error('请输入有效的DeepSeek API密钥（应以sk-开头）')
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch('/api/user/api-key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: apiKey }),
      })

      if (res.ok) {
        toast.success('API密钥保存成功')
        setApiKey('')
        setConfirmApiKey('')
        setIsApiKeySet(true)
        onApiKeySet?.(true)
      } else {
        const errorData = await res.json()
        toast.error('保存失败', { description: errorData.error || '服务器错误' })
      }
    } catch (error) {
      toast.error('保存失败', { description: '网络错误，请重试' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleClearApiKey = async () => {
    if (!confirm('确定要清除已保存的API密钥吗？清除后将无法使用AI生成功能。')) {
      return
    }

    try {
      const res = await fetch('/api/user/api-key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: '' }),
      })

      if (res.ok) {
        toast.success('API密钥已清除')
        setIsApiKeySet(false)
        onApiKeySet?.(false)
      } else {
        const errorData = await res.json()
        toast.error('清除失败', { description: errorData.error || '服务器错误' })
      }
    } catch (error) {
      toast.error('清除失败', { description: '网络错误，请重试' })
    }
  }

  if (isLoading) {
    return (
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API密钥设置
          </CardTitle>
          <CardDescription>
            正在检查API密钥状态...
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          API密钥设置
        </CardTitle>
        <CardDescription>
          设置您的DeepSeek API密钥以使用AI生成功能
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API密钥状态显示 */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          {isApiKeySet ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">API密钥已设置</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-700 font-medium">未设置API密钥</span>
            </>
          )}
        </div>

        {/* API密钥设置表单 */}
        {!isApiKeySet && (
          <form onSubmit={handleSaveApiKey} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">DeepSeek API密钥</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                您的API密钥将以加密形式安全存储
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmApiKey">确认API密钥</Label>
              <div className="relative">
                <Input
                  id="confirmApiKey"
                  type={showConfirmApiKey ? 'text' : 'password'}
                  value={confirmApiKey}
                  onChange={(e) => setConfirmApiKey(e.target.value)}
                  placeholder="请再次输入API密钥"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setShowConfirmApiKey(!showConfirmApiKey)}
                >
                  {showConfirmApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSaving || !apiKey.trim()}
              className="w-full"
            >
              {isSaving ? '保存中...' : '保存API密钥'}
            </Button>
          </form>
        )}

        {/* 清除API密钥按钮 */}
        {isApiKeySet && (
          <Button
            variant="destructive"
            onClick={handleClearApiKey}
            className="w-full"
          >
            清除API密钥
          </Button>
        )}

        {/* 获取API密钥的说明 */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 space-y-2">
          <h4 className="font-medium text-blue-900 dark:text-blue-100">如何获取DeepSeek API密钥？</h4>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
            <li>访问 <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="underline">DeepSeek平台</a></li>
            <li>注册并登录您的账户</li>
            <li>进入API密钥管理页面</li>
            <li>创建新的API密钥</li>
            <li>复制密钥（格式：sk-...）并粘贴到上方输入框</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}