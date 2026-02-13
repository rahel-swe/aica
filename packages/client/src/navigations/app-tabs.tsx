
import { LayoutDashboard, Map, Bot, Inbox, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

export default function AppTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      {/* Floating Action Button */}
      <div className="absolute -top-12 right-4">
        <Button
          size="icon"
          className="h-12 w-12 rounded-2xl shadow-2xl border border-white/10 bg-black text-white hover:bg-black/80"
          onClick={() => navigate('/app/chatbot')}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Tabs Bar */}
      <div className="mx-2 mb-2 rounded-2xl border border-white/10 bg-black shadow-2xl">
        <div className="grid grid-cols-4 py-2">
          <TabItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            active={location.pathname === '/app/dashboard'}
            onClick={() => navigate('/app/dashboard')}
          />
          <TabItem
            icon={<Map className="h-5 w-5" />}
            label="Roadmap"
            active={location.pathname === '/app/roadmap'}
            onClick={() => navigate('/app/roadmap')}
          />
          <TabItem
            icon={<Bot className="h-5 w-5" />}
            label="Chatbot"
            active={location.pathname === '/app/chatbot'}
            onClick={() => navigate('/app/chatbot')}
          />
          <TabItem
            icon={<Inbox className="h-5 w-5" />}
            label="Inbox"
            active={location.pathname === '/app/inbox'}
            onClick={() => navigate('/app/inbox')}
          />
        </div>
      </div>
    </div>
  )
}

function TabItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 text-xs"
    >
      <div className={`flex items-center justify-center ${active ? 'text-white' : 'text-white/60'}`}>{icon}</div>
      <span className={`${active ? 'text-white font-medium' : 'text-white/60'}`}>{label}</span>
    </button>
  )
}
