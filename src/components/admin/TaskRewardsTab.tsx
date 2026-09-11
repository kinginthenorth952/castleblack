import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  CheckCircle2, 
  Coins, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskReward } from '../../types';

export const TaskRewardsTab: React.FC = () => {
  const { taskRewards, adminAddTaskReward, adminToggleTaskReward, adminDeleteTaskReward } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewardAmount, setRewardAmount] = useState(50);
  const [taskType, setTaskType] = useState<TaskReward['taskType']>('social');
  const [targetUrl, setTargetUrl] = useState('');
  const [requiredAction, setRequiredAction] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !requiredAction) return;

    adminAddTaskReward({
      title,
      description: description || 'Complete action to earn bonus wallet credit.',
      rewardAmount: Number(rewardAmount) || 50,
      taskType,
      targetUrl: targetUrl || undefined,
      requiredAction,
      status: 'active',
    });

    setTitle('');
    setDescription('');
    setRequiredAction('');
    setTargetUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Tasks & User Rewards</h2>
            <p className="text-xs text-[#7F8792]">
              Configure engagement bounties, social channels verification, and bonus wallet incentives.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Tasks Table / Cards */}
      <div className="bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9EA7B4]">
            <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
              <tr>
                <th className="px-4 py-3">Task Title & Details</th>
                <th className="px-4 py-3">Classification</th>
                <th className="px-4 py-3">Reward Bounty</th>
                <th className="px-4 py-3">Completions</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D232B]">
              {taskRewards.map((task) => {
                const isActive = task.status === 'active';
                return (
                  <tr key={task.id} className="hover:bg-[#151A21] transition">
                    <td className="px-4 py-3.5">
                      <div>
                        <div className="font-bold text-[#F4F1EA] text-xs">{task.title}</div>
                        <span className="text-[11px] text-[#7F8792] block">{task.requiredAction}</span>
                        {task.targetUrl && (
                          <a
                            href={task.targetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-[#D6B36A] hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            <span>Open URL Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#171E27] text-sky-400 border border-sky-800/40">
                        {task.taskType}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        +Rs {task.rewardAmount.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 text-[11px] text-[#F4F1EA] font-mono">
                        <Users className="w-3 h-3 text-[#7F8792]" />
                        <span>{task.totalCompletions.toLocaleString()} claimed</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isActive
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-[#1C2026] text-[#636C78]'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => adminToggleTaskReward(task.id)}
                        className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-[#D6B36A] transition"
                        title="Toggle Task Status"
                      >
                        {isActive ? (
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-[#636C78]" />
                        )}
                      </button>

                      <button
                        onClick={() => adminDeleteTaskReward(task.id)}
                        className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400 transition"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Add Reward Task</h3>
            <p className="text-xs text-[#7F8792] mb-4">Users receive balance credits upon completion.</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subscribe to Official YouTube"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Reward (PKR)</label>
                  <input
                    type="number"
                    required
                    value={rewardAmount}
                    onChange={(e) => setRewardAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Category</label>
                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value as TaskReward['taskType'])}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  >
                    <option value="social">Social Media</option>
                    <option value="video">Video Watch</option>
                    <option value="app">App Install / Review</option>
                    <option value="daily_checkin">Daily Check-in</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Action Requirement Prompt</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subscribe and like the pinned video"
                  value={requiredAction}
                  onChange={(e) => setRequiredAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Target Link URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/@..."
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
