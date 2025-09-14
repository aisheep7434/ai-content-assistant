'use client' // 客户端组件

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
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
// ⬇️ ⬇️ ⬇️ 新增导入 Card 组件 ⬇️ ⬇️ ⬇️
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link' // 我们也加上“注册”链接


// 表单 schema (不变)
const formSchema = z.object({
  username: z.string().min(2, "用户名至少需要2个字符"),
  password: z.string().min(4, "密码至少需要4个字符"),
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 从 URL 参数中获取用户名并自动填充
  useEffect(() => {
    const usernameFromUrl = searchParams.get('username')
    if (usernameFromUrl) {
      form.setValue('username', decodeURIComponent(usernameFromUrl))
    }
  }, [searchParams, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast.success("登录成功")
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "登录失败")
      }
    } catch (error) {
      toast.error("网络错误，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }
  
  // ⬇️ ⬇️ ⬇️ 渲染 UI (更新为使用 Card) ⬇️ ⬇️ ⬇️
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>
          请输入您的凭据以访问您的账户。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入您的用户名" {...field} />
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
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="请输入您的密码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center text-sm">
          还没有账户?{" "}
          <Link href="/register" className="underline">
            立即注册
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}