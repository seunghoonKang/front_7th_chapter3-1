import { useState } from "react";
import { userService } from "@/services/userService";
import type { User } from "@/services/userService";

interface UseUserManagementReturn {
  users: User[];
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedUser: User | null;
  formData: any;
  showSuccessAlert: boolean;
  alertMessage: string;
  showErrorAlert: boolean;
  errorMessage: string;
  setFormData: (data: any) => void;
  setIsCreateModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  loadUsers: () => Promise<void>;
  handleCreate: () => Promise<void>;
  handleEdit: (user: User) => void;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  closeModals: () => void;
  setShowSuccessAlert: (show: boolean) => void;
  setShowErrorAlert: (show: boolean) => void;
}

export const useUserManagement = (): UseUserManagementReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUsers = async () => {
    try {
      const result = await userService.getAll();
      setUsers(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      await userService.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || "user",
        status: formData.status || "active",
      });

      await loadUsers();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage("사용자가 생성되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await userService.update(selectedUser.id, formData);
      await loadUsers();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedUser(null);
      setAlertMessage("사용자가 수정되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await userService.delete(id);
      await loadUsers();
      setAlertMessage("사용자가 삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedUser(null);
  };

  return {
    users,
    isCreateModalOpen,
    isEditModalOpen,
    selectedUser,
    formData,
    showSuccessAlert,
    alertMessage,
    showErrorAlert,
    errorMessage,
    setFormData,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    loadUsers,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    closeModals,
    setShowSuccessAlert,
    setShowErrorAlert,
  };
};

