// 阶段四之前，这只是一个简单的页面组件。
// 它会自动被 (protected)/layout.tsx 包裹，所以你不需要在这里重复添加导航栏。

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        仪表盘
      </h1>
      <p className="text-muted-foreground">
        欢迎回来！你已成功登录。
      </p>
      
      {/* 在下一个阶段 (阶段四), 
        我们将在这里添加 AI 内容生成器 (Textarea 和 Button)。
      */}
    </div>
  );
}