"""add questions table

Revision ID: 9f2d1a7b4c10
Revises: c6c1ac6f77a0
Create Date: 2026-11-04 10:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = '9f2d1a7b4c10'
down_revision: Union[str, None] = 'c6c1ac6f77a0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'questions',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('prompt', sa.String(), nullable=False),
        sa.Column('choices', sa.JSON(), nullable=False),
        sa.Column('answer_index', sa.Integer(), nullable=False),
        sa.Column('explanation', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_questions_category'), 'questions', ['category'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_questions_category'), table_name='questions')
    op.drop_table('questions')
