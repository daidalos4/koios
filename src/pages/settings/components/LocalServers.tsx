import { useState, useEffect } from "react";
import { Button, Input } from "@/components";
import {
  ChevronDownIcon,
  ServerIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  SaveIcon,
  RefreshCwIcon,
} from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import { cn } from "@/lib/utils";
import { safeLocalStorage } from "@/lib";
import { STORAGE_KEYS } from "@/config";

interface LocalServerConfig {
  lmStudioHost: string;
  lmStudioPort: string;
  whisperHost: string;
  whisperPort: string;
}

const DEFAULT_CONFIG: LocalServerConfig = {
  lmStudioHost: "127.0.0.1",
  lmStudioPort: "1234",
  whisperHost: "127.0.0.1",
  whisperPort: "8080",
};

export const LocalServers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lmStudioStatus, setLmStudioStatus] = useState<"checking" | "online" | "offline">("checking");
  const [whisperStatus, setWhisperStatus] = useState<"checking" | "online" | "offline">("checking");
  const [isLaunchingLmStudio, setIsLaunchingLmStudio] = useState(false);
  const [config, setConfig] = useState<LocalServerConfig>(DEFAULT_CONFIG);
  const [editConfig, setEditConfig] = useState<LocalServerConfig>(DEFAULT_CONFIG);
  const [hasChanges, setHasChanges] = useState(false);

  // Load config on mount
  useEffect(() => {
    const saved = safeLocalStorage.getItem(STORAGE_KEYS.LOCAL_SERVER_CONFIG);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        setEditConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch {
        // Use defaults
      }
    }
  }, []);

  // Check for changes
  useEffect(() => {
    setHasChanges(
      editConfig.lmStudioHost !== config.lmStudioHost ||
      editConfig.lmStudioPort !== config.lmStudioPort ||
      editConfig.whisperHost !== config.whisperHost ||
      editConfig.whisperPort !== config.whisperPort
    );
  }, [editConfig, config]);

  const saveConfig = () => {
    setConfig(editConfig);
    safeLocalStorage.setItem(STORAGE_KEYS.LOCAL_SERVER_CONFIG, JSON.stringify(editConfig));
    setHasChanges(false);
    checkServers();
  };

  const getLmStudioUrl = () => `http://${config.lmStudioHost}:${config.lmStudioPort}`;
  const getWhisperUrl = () => `http://${config.whisperHost}:${config.whisperPort}`;

  const checkServers = async () => {
    setLmStudioStatus("checking");
    setWhisperStatus("checking");

    // Check LM Studio
    try {
      const lmOnline = await invoke<boolean>("check_server_status", {
        url: `${getLmStudioUrl()}/v1/models`,
      });
      setLmStudioStatus(lmOnline ? "online" : "offline");
    } catch {
      setLmStudioStatus("offline");
    }

    // Check Whisper
    try {
      const whisperOnline = await invoke<boolean>("check_server_status", {
        url: `${getWhisperUrl()}/`,
      });
      setWhisperStatus(whisperOnline ? "online" : "offline");
    } catch {
      setWhisperStatus("offline");
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkServers();
    }
  }, [isOpen, config]);

  const handleLaunchLmStudio = async () => {
    setIsLaunchingLmStudio(true);
    try {
      await invoke("launch_lm_studio");
      // Wait a bit then check status
      setTimeout(() => {
        checkServers();
        setIsLaunchingLmStudio(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to launch LM Studio:", error);
      setIsLaunchingLmStudio(false);
    }
  };

  const StatusIcon = ({ status }: { status: "checking" | "online" | "offline" }) => {
    if (status === "checking") {
      return <Loader2Icon className="w-4 h-4 animate-spin text-muted-foreground" />;
    }
    if (status === "online") {
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    }
    return <XCircleIcon className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          <ServerIcon className="w-5 h-5 text-muted-foreground" />
          <div className="text-left">
            <h3 className="text-sm font-medium">Local AI Servers</h3>
            <p className="text-xs text-muted-foreground">
              Configure LM Studio and Whisper servers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isOpen && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">LM:</span>
                <StatusIcon status={lmStudioStatus} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Whisper:</span>
                <StatusIcon status={whisperStatus} />
              </div>
            </div>
          )}
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4 border-t">
          {/* LM Studio Configuration */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status={lmStudioStatus} />
                <span className="text-sm font-medium">LM Studio</span>
                <span className="text-xs text-muted-foreground">
                  {lmStudioStatus === "online" ? "Connected" : "Not running"}
                </span>
              </div>
              {lmStudioStatus !== "online" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1"
                  onClick={handleLaunchLmStudio}
                  disabled={isLaunchingLmStudio}
                >
                  {isLaunchingLmStudio ? (
                    <Loader2Icon className="w-3 h-3 animate-spin" />
                  ) : (
                    <PlayIcon className="w-3 h-3" />
                  )}
                  Launch
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Host</label>
                <Input
                  value={editConfig.lmStudioHost}
                  onChange={(e) => setEditConfig({ ...editConfig, lmStudioHost: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="127.0.0.1"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-muted-foreground mb-1 block">Port</label>
                <Input
                  value={editConfig.lmStudioPort}
                  onChange={(e) => setEditConfig({ ...editConfig, lmStudioPort: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="1234"
                />
              </div>
            </div>
          </div>

          {/* Whisper Configuration */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center gap-2 pt-2">
              <StatusIcon status={whisperStatus} />
              <span className="text-sm font-medium">Local Whisper</span>
              <span className="text-xs text-muted-foreground">
                {whisperStatus === "online" ? "Connected" : "Not running (start manually)"}
              </span>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Host</label>
                <Input
                  value={editConfig.whisperHost}
                  onChange={(e) => setEditConfig({ ...editConfig, whisperHost: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="127.0.0.1"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-muted-foreground mb-1 block">Port</label>
                <Input
                  value={editConfig.whisperPort}
                  onChange={(e) => setEditConfig({ ...editConfig, whisperPort: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="8080"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={checkServers}
              className="flex-1 h-8 text-xs gap-1"
            >
              <RefreshCwIcon className="w-3 h-3" />
              Check Status
            </Button>
            <Button
              size="sm"
              onClick={saveConfig}
              disabled={!hasChanges}
              className="flex-1 h-8 text-xs gap-1"
            >
              <SaveIcon className="w-3 h-3" />
              Save Changes
            </Button>
          </div>

          {/* Help text */}
          <p className="text-xs text-muted-foreground text-center pt-2">
            Configure these servers to use local AI for voice transcription (Whisper) and chat responses (LM Studio).
          </p>
        </div>
      )}
    </div>
  );
};
