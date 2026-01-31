import { motion } from "framer-motion";
import { ExternalLink, Copy } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useRef, useState } from "react";
// 引入弹窗组件
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  title: string;
  role: string;
  description: string;
  tags?: string[];
  stats?: string;
  link?: string;
  isMiniProgram?: boolean; // 新增：是否为小程序
  miniProgramLink?: string; // 新增：小程序路径
}

export function ProjectCard({ 
  title, 
  role, 
  description, 
  tags, 
  stats, 
  link, 
  isMiniProgram, 
  miniProgramLink 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 控制弹窗
  const { toast } = useToast();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleAction = (e: React.MouseEvent) => {
    if (isMiniProgram) {
      e.preventDefault();
      setIsDialogOpen(true);
    }
  };

  const copyLink = () => {
    if (miniProgramLink) {
      navigator.clipboard.writeText(miniProgramLink);
      toast({
        description: "链接已复制到剪贴板",
      });
    }
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="spotlight-card rounded-xl group h-full"
        style={{
          "--mouse-x": `${position.x}px`,
          "--mouse-y": `${position.y}px`,
          "--active": opacity,
        } as React.CSSProperties}
      >
        <Card className="h-full border-none shadow-none bg-transparent overflow-hidden flex flex-col">
          <CardContent className="p-6 flex-1 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-sans font-semibold text-foreground">{title}</h3>
                <p className="text-xs text-primary/70 font-medium uppercase tracking-wider">{role}</p>
              </div>

              {/* 右上角图标：如果是小程序则触发弹窗 */}
              {(link || isMiniProgram) && (
                <div className="relative">
                  <a 
                    href={link || "#"} 
                    target={isMiniProgram ? "_self" : "_blank"}
                    onClick={handleAction}
                    className="text-muted-foreground/50 hover:text-primary transition-colors relative z-20"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                      点击这里查看项目
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed font-normal">
              {description}
            </p>

            {/* 统计数据 */}
            {stats && (
              <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-foreground">{stats}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal text-xs border-primary/20 text-primary bg-background/30 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      </motion.div>

      {/* 小程序提示弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-lg border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">体验 AI 小程序</DialogTitle>
            <DialogDescription className="text-muted-foreground py-4">
              复制下方小程序链接发送至微信聊天框，点击即可体验：
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 break-all font-mono text-xs text-primary leading-relaxed relative group/code">
              {miniProgramLink}
              <button 
                onClick={copyLink}
                className="absolute right-2 top-2 p-1.5 bg-background border border-border rounded-md hover:border-primary transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
              提示：微信内长按粘贴发送即可
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}