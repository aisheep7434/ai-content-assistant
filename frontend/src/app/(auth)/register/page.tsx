'use client' // 客户端组件

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // 使用 Sonner
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" // 导入 Card 组件
import Link from 'next/link'

// 表单 schema
const formSchema = z.object({
  username: z.string().min(2, "用户名至少需要2个字符"),
  password: z.string().min(4, "密码至少需要4个字符"),
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  })

  // 提交逻辑 (调用 /api/auth/register BFF)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '注册失败')
      }

      toast.success("注册成功!", {
        description: "请立即登录您的新账户。",
      })

      // 跳转到登录页面并传递用户名参数
      router.push(`/login?username=${encodeURIComponent(values.username)}`) // 注册成功后跳转到登录页

    } catch (error) {
      toast.error("注册出错", {
        description: error instanceof Error ? error.message : "注册失败",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 渲染 UI (使用 Card 美化)
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">创建账户</CardTitle>
        <CardDescription className="text-center">
          请输入用户名和密码以注册新账户
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">用户名</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="创建您的用户名"
                      {...field}
                      className="h-11 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">密码</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="创建您的密码"
                      {...field}
                      className="h-11 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 font-medium"
            >
              {isLoading ? '注册中...' : '创建账户'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          已经有账户了?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline transition-colors"
          >
            点此登录
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}