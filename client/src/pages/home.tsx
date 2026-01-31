import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, Download, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { ParticleText } from "@/components/particle-text";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/20">
        <div className="container-custom h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest text-foreground uppercase">
            黄安琪
          </span>
          <div className="flex gap-8 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              经历
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              作品
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              联系
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <div className="container-custom relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0.01, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative inline-block">
              <div className="mb-10 h-[100px] flex items-center justify-center">
                <ParticleText text="黄安琪" />
              </div>

              {/* Profile Photo */}
              <motion.div
                className="absolute -right-20 md:-right-32 top-0 group"
                initial={{ opacity: 0.01, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative">
                  {/* Breathing Edge Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 scale-100 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-1000 animate-pulse blur-md" />

                  <img
                    src="/简历照片_1768899999906.jpg"
                    alt="黄安琪"
                    className="relative w-20 h-20 md:w-24 md:h-24 object-cover rounded-full group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-700 ease-in-out cursor-crosshair z-20"
                  />
                </div>
              </motion.div>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <motion.h1
                initial={{ opacity: 0.01, y: 20, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-foreground"
              >
                内容与增长运营者
              </motion.h1>
              <motion.p
                initial={{ opacity: 0.01, y: 20, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto"
              >
                以数据为底座，内容为杠杆，AI为引擎，在商务博弈中实现业务的可持续增长。
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.01, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-row gap-4 justify-center pt-8"
          >
            <Button
              size="sm"
              className="btn-beam rounded-full px-10 py-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-none transition-all"
              onClick={() => scrollToSection("contact")}
            >
              开始交谈
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="btn-beam rounded-full px-10 py-6 text-xs uppercase tracking-widest border-border hover:bg-accent/10 text-muted-foreground"
              asChild
            >
              <a href="/resume.pdf" download="黄安琪-个人简历.pdf">
                <Download className="mr-2 h-3.5 w-3.5" /> 下载简历
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 animate-bounce"
          initial={{ opacity: 0.01, y: 0, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Experience Section */}
          <Section
            id="experience"
            title="历程"
            subtitle="以数据洞察驱动决策，深耕百万级流量内容策划，在商务博弈中实现业务的可持续增长，并深度使用 AI 工具重构运营效率。"
          >
            <div className="relative space-y-12 before:absolute before:left-[-25px] md:before:left-[-40px] before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/10">
          <ExperienceCard
            company="深圳市万象美物业管理有限公司（碧桂园服务集团）"
            role="场地运营"
            period="2024.07 - 至今"
            achievements={[
              "增长策略：管理400+项目场地数据，构建【项目x业务适配度】评估模型，推动场地得分提升20%，业务推进率提升60%",
              "资源提效：统筹全国300+社区场地数据，通过指标模型推动物业用房去化，出租率由10%提升至51%，新增营收269万",
              "业务标准化：搭建直饮水机业务从0-1标准化SOP，跑通42台设备业务模式；优化充电桩运维SOP，离线率从3.7%降至1.7%",
            ]}
          />
          <ExperienceCard
            company="南京中生联合股份有限公司（好健康）"
            role="媒介运营实习生"
            period="2024.04 - 2024.07"
            achievements={[
              "内容运营：累计输出150+稿件内容，实现爆文率36%，确保内容具备传播力",
              "数据分析：建立周报分析机制识别高转化特征，内容转化率提升20+%，单篇最高进店UV 1000+",
              "商务合作：深度分析达人历史数据，洽谈对接600+达人，提炼优质账号200+",
            ]}
          />
          <ExperienceCard
            company="长沙开发者科技有限公司 (CSDN)"
            role="大赛运营实习生"
            period="2023.09 - 2024.01"
            achievements={[
              "社区运营：从0规划并落地AI科技社区，吸引5家头部企业入驻，单月用户注册80+",
              "活动策划：跟进1024程序员节大赛全流程，线上直播4w人次观看，满意度达95%",
              "内容运营：负责全渠道宣发，实现总曝光260w+，沉淀高转化内容模板，复用后点击率提升20%",
            ]}
          />
          <ExperienceCard
            company="广州方硅信息技术有限公司（百度YY）"
            role="商务经纪人"
            period="2023.01 - 2023.03"
            achievements={[
              "内容策划：打造“粤语女声”内容方向，助力艺人账号从50w增长至100w粉",
              "用户运营：策划“群内首发+互动打卡”玩法提升社群活跃，统筹商务合作全流程执行",
              "商务洽谈：负责中腰部艺人谈判，定制个性化方案，实现3次成功合作带来50w+营收",
            ]}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section
        id="projects"
        title="作品"
        subtitle="个人项目体现了优秀的运营能力与内容策划能力。"
        className="bg-secondary/5"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard
            title="自媒体账号孵化与运营 (抖音&小红书&得物)"
            role="账号负责人"
            description="结合行业热点趋势及用户痛点，策划选题并负责内容撰写、 拍摄与剪辑及数据追踪，累计发布400+内容。"
            stats="粉丝总量 9w+ | 单篇浏览 100w+ | 商业变现 15w+"
            tags={["内容运营", "数据分析", "商务洽谈"]}
            link="https://v.douyin.com/ZnQYt4svpSE/"
          />
          <ProjectCard
            title="AI 小程序"
            role="开发与运营"
            description="利用 Cursor、Qoder 等 AI 工具快速搭建并上线小程序，差异化引入AI接口，探索 AI 在生活方式领域的应用。"
            stats="入选腾讯 AI 成长计划 | AI 全栈开发 | AI助力习惯养成"
            tags={["AI工具", "小程序", "产品开发"]}
            isMiniProgram={true}
            miniProgramLink="#小程序://适心习惯/CJUrxAnLQlGIG4b"
          />
          <ProjectCard
            title="AI 社区生态构建"
            role="社区运营"
            description="从0-1规划并执行落地，吸引5家头部科技企业入驻，构建高质量 AI 开发者交流阵地。"
            stats="邀约5+头部科技企业 | 收录40+ AI 内容 | 单月注册人数80+"
            tags={["人工智能", "社区运营", "B2B"]}
            link="https://devpress.csdn.net/agi"
          />
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="技能与证书" subtitle="专业工具栈与行业资质。">
        <div className="flex flex-wrap gap-3 pt-4">
          {[
            "AI工具 (Coze/Cursor)",
            "Python",
            "Tableau",
            "PS/PR/剪映",
            "Excel (VLOOKUP)",
            "AutoCAD",
            "BIM",
            "CET-4",
          ].map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="px-4 py-2 text-sm border-primary/20 text-primary bg-white/50"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Contact Footer */}
      <footer
        id="contact"
        className="bg-foreground text-background py-8 md:py-10"
      >
        <div className="container-custom text-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-background text-xl md:text-2xl">
              清晰不是僵硬。
            </h2>
            <p className="text-background/40 max-w-lg mx-auto uppercase tracking-widest text-[9px]">
              它是变化之后仍能构建秩序的能力。
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-8">
            <a
              href="mailto:aq1340566585@163.com"
              className="group flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium tracking-wider hidden md:inline">
                aq1340566585@163.com
              </span>
            </a>
            <div className="group flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium tracking-wider hidden md:inline">
                181-7559-8095
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-[8px] text-background/20 uppercase tracking-[0.4em]">
            © 2026 黄安琪-从混乱中重构秩序。
          </div>
        </div>
      </footer>
    </div>
  );
}