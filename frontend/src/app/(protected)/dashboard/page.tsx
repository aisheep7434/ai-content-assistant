'use client'

import React, { useState } from 'react'
// 【重要】我们保留 useQuery 来获取历史，但不再使用 useMutation (因为我们要手动 fetch 流)
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Users, HardDrive, Zap } from "lucide-react"; // (移除未使用的图标)
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import ApiKeySettings from '@/components/api-key-settings'

// --- API 调用函数 (只保留 getHistory) ---
const getHistory = async () => {
  const res = await fetch('/api/documents'); 
  if (!res.ok) {
     throw new Error('获取历史记录失败');
  }
  return res.json();
}
// ----------------------------------------


export default function DashboardPage() {
  
  const [prompt, setPrompt] = useState("")
  const queryClient = useQueryClient() 

  // --- (来自教程阶段五) 新的状态，用于保存流式内容和加载状态 ---
  const [streamedContent, setStreamedContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false) // 用于禁用按钮
  const [isApiKeySet, setIsApiKeySet] = useState(false) // API密钥状态

  // --- (来自教程阶段四) useQuery 逻辑保持不变 ---
  const { data: history, isLoading: isHistoryLoading } = useQuery({
     queryKey: ['history'], 
     queryFn: getHistory,    
  })

  
  // --- 流式生成函数 ---
  const handleSubmitStream = async () => {
    console.log('开始AI生成，提示词:', prompt);
    console.log('API密钥状态:', isApiKeySet);

    if (!prompt) {
      toast.error("请输入提示词");
      return;
    }

    // 检查是否设置了API密钥
    if (!isApiKeySet) {
      toast.error("请先设置您的DeepSeek API密钥", {
        description: "在页面下方的API密钥设置区域进行配置"
      })
      return
    }

    setIsStreaming(true)
    setStreamedContent("") // 清空上次结果
    console.log('开始调用AI生成API...');

    try {
      // 1. 调用流式生成API
      const res = await fetch('/api/generate/title/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.body) {
        throw new Error("响应体为空")
      }
      
      // 2. (来自教程阶段五) 准备读取器和解码器
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false;

      // 3. (来自教程阶段五) 循环读取数据流 (SSE 格式)
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone;
        
        const chunk = decoder.decode(value, { stream: true }); // 解码数据块
        
        // SSE 格式 (data: ...) 可能在一个块中包含多条消息
        const lines = chunk.split('\n\n'); 
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6); // 移除 "data: " 前缀
            
            if (data === '[DONE]') { // 这是我们后端设置的结束信号
              done = true;
              break;
            } else if (data.startsWith('[ERROR]')) { // 这是我们后端设置的错误信号
              const errorMsg = data.substring(8);
              toast.error("AI 生成出错", { description: errorMsg });
              done = true;
              break;
            } else {
              // 实时更新 React 状态以显示打字机效果
              setStreamedContent(prev => prev + data);
            }
          }
        }
      }

    } catch (error: any) {
      console.error('AI生成请求失败:', error);
      toast.error("请求失败", {
        description: error.message || '请检查网络连接和API密钥设置'
      });
    } finally {
      setIsStreaming(false) // 无论成功失败，都解除禁用
      
      // 4. 【关键】(来自教程阶段四) 
      // 流结束后，我们仍然需要刷新历史记录列表！
      queryClient.invalidateQueries({ queryKey: ['history'] });
    }
  }
  // ----------------------------------------


  return (
    <div className="space-y-8">

      {/* 欢迎区域 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          欢迎使用 <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">AI Content Assistant</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          智能内容生成平台，让AI助您创作出精彩内容
        </p>
      </div>

      {/* 统计卡片区域 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">AI驱动</p>
                <p className="text-muted-foreground">智能生成</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Zap className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">实时响应</p>
                <p className="text-muted-foreground">流式输出</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">用户友好</p>
                <p className="text-muted-foreground">简单易用</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <HardDrive className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">安全存储</p>
                <p className="text-muted-foreground">加密保护</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI 生成器 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            开始创作 (DeepSeek)
          </CardTitle>
          <CardDescription className="text-lg">
            在下方输入你的提示词，立即开始生成内容 (流式响应)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：写一篇关于太空探索的博客文章标题..."
            className="min-h-[120px] shadow-inner"
          />
          <Button 
            onClick={handleSubmitStream} // <-- 改为调用流式函数
            disabled={isStreaming} // <-- 绑定到流式状态
            className="w-full font-bold text-lg py-6 shadow-lg hover:shadow-primary/40 transition-all duration-300"
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            {isStreaming ? '正在生成...' : '立即生成 (Stream)'}
          </Button>
        </CardContent>
      </Card>

      {/* 4. 最新结果 (现在绑定到 streamedContent state) */}
      {streamedContent && (
        <Card className="bg-muted/50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>AI 实时响应</CardTitle>
          </CardHeader>
          <CardContent>
             {/* 这是一个简单的 pre 标签，用于显示正在打字的流内容 */}
             <pre className="whitespace-pre-wrap font-sans text-lg">
              {streamedContent}
             </pre>
          </CardContent>
        </Card>
      )}

      {/* 功能特性展示 */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">功能特性</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">实时生成</h3>
              <p className="text-sm text-muted-foreground">流式响应，即时查看AI创作过程</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">智能理解</h3>
              <p className="text-sm text-muted-foreground">准确理解用户意图，生成高质量内容</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <HardDrive className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">安全可靠</h3>
              <p className="text-sm text-muted-foreground">API密钥加密存储，保护用户隐私</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 6. API密钥设置 */}
      <ApiKeySettings onApiKeySet={setIsApiKeySet} />

      <Separator />

      {/* 7. 历史记录 (来自教程逻辑, 保持不变) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">历史记录</h2>
        {isHistoryLoading ? (
          <p>正在加载历史记录...</p>
        ) : (
          <div className="space-y-4">
            {history && history.length > 0 ? (
              history.map((doc: any) => (
                <Card key={doc.id} className="shadow-md border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{doc.prompt}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(doc.created_at).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{doc.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">暂无历史记录。快去生成你的第一个内容吧！</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}