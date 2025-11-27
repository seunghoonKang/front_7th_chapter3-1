import { useState } from "react";
import { postService } from "@/services/postService";
import type { Post } from "@/services/postService";

interface UsePostManagementReturn {
  posts: Post[];
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPost: Post | null;
  formData: any;
  showSuccessAlert: boolean;
  alertMessage: string;
  showErrorAlert: boolean;
  errorMessage: string;
  setFormData: (data: any) => void;
  setIsCreateModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  loadPosts: () => Promise<void>;
  handleCreate: () => Promise<void>;
  handleEdit: (post: Post) => void;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handlePublish: (id: number) => Promise<void>;
  handleArchive: (id: number) => Promise<void>;
  handleRestore: (id: number) => Promise<void>;
  closeModals: () => void;
  setShowSuccessAlert: (show: boolean) => void;
  setShowErrorAlert: (show: boolean) => void;
}

export const usePostManagement = (): UsePostManagementReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadPosts = async () => {
    try {
      const result = await postService.getAll();
      setPosts(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      await postService.create({
        title: formData.title,
        content: formData.content || "",
        author: formData.author,
        category: formData.category,
        status: formData.status || "draft",
      });

      await loadPosts();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage("게시글이 생성되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      status: post.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;

    try {
      await postService.update(selectedPost.id, formData);
      await loadPosts();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedPost(null);
      setAlertMessage("게시글이 수정되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await postService.delete(id);
      await loadPosts();
      setAlertMessage("게시글이 삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handlePublish = async (id: number) => {
    try {
      await postService.publish(id);
      await loadPosts();
      setAlertMessage("게시되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await postService.archive(id);
      await loadPosts();
      setAlertMessage("보관되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await postService.restore(id);
      await loadPosts();
      setAlertMessage("복원되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedPost(null);
  };

  return {
    posts,
    isCreateModalOpen,
    isEditModalOpen,
    selectedPost,
    formData,
    showSuccessAlert,
    alertMessage,
    showErrorAlert,
    errorMessage,
    setFormData,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    loadPosts,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handlePublish,
    handleArchive,
    handleRestore,
    closeModals,
    setShowSuccessAlert,
    setShowErrorAlert,
  };
};

