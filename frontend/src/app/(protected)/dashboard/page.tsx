// 阶段四之前，这只是一个简单的页面组件。
// 它会自动被 (protected)/layout.tsx 包裹，所以你不需要在这里重复添加导航栏。

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Users, HardDrive, Zap, FileText, Package, Mail } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center space-y-4 py-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            欢迎使用 AI Content Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            您的智能内容创作伙伴，让创意无限可能
          </p>
        </div>
      </div>

      {/* 统计卡片区域 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="absolute inset-0 bg-white/5" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium text-blue-100 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              总生成次数
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-1">
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-blue-100">
              本周生成次数
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="absolute inset-0 bg-white/5" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium text-green-100 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              活跃会话
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-1">
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-green-100">
              当前活跃会话
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="absolute inset-0 bg-white/5" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
              <HardDrive className="w-4 h-4 mr-2" />
              存储使用
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-1">
            <div className="text-3xl font-bold">0 MB</div>
            <p className="text-xs text-purple-100">
              总存储空间
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="absolute inset-0 bg-white/5" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium text-orange-100 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              响应时间
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-1">
            <div className="text-3xl font-bold">0ms</div>
            <p className="text-xs text-orange-100">
              平均响应时间
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 快速开始区域 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            快速开始
          </CardTitle>
          <CardDescription className="text-lg">
            选择一个模板，立即开始创作您的精彩内容
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 border-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">写博客文章</h3>
                <p className="text-sm text-muted-foreground mt-1">创作高质量的博客内容</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 border-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Package className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">生成产品描述</h3>
                <p className="text-sm text-muted-foreground mt-1">吸引人的产品文案</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 border-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">创建邮件内容</h3>
                <p className="text-sm text-muted-foreground mt-1">专业的邮件模板</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 功能特性展示 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">强大功能</CardTitle>
          <CardDescription>
            探索我们为您提供的智能创作工具
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto text-white">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg">智能生成</h3>
              <p className="text-sm text-muted-foreground">
                基于先进AI技术，快速生成高质量内容
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg">多语言支持</h3>
              <p className="text-sm text-muted-foreground">
                支持多种语言的内容创作和翻译
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto text-white">
                <HardDrive className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg">历史记录</h3>
              <p className="text-sm text-muted-foreground">
                自动保存创作历史，随时查看和编辑
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 在下一个阶段 (阶段四),
        我们将在这里添加 AI 内容生成器 (Textarea 和 Button)。
      */}
    </div>
  );
}