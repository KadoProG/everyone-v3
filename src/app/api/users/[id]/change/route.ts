import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

// ここからはPOST
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // GitHubのIDを格納
  const githubAccountId = params.id;

  const body = await request.json();

  const isLocalStorage: boolean = body.isLocalStorage;

  // 更新の処理をする
  const data = await prisma.user.update({
    where: {
      githubAccountId,
    },
    data: {
      isLocalStorage,
    },
  });

  const result = {
    first: data.firstStudentNo,
    favorites: data.studentFavorites,
    isLocalStorage: data.isLocalStorage,
  };

  return new Response(JSON.stringify({ success: true, data: result }));
}
