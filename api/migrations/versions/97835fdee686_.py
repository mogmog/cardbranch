"""empty message

Revision ID: 97835fdee686
Revises: 
Create Date: 2018-03-08 16:33:58.153179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97835fdee686'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cardtemplate',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('wrapper_component', sa.String(length=255), nullable=True),
    sa.Column('form', sa.JSON(), nullable=True),
    sa.Column('context', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('template_id', sa.Integer(), nullable=True),
    sa.Column('wrapper', sa.String(length=255), nullable=True),
    sa.Column('key', sa.String(length=255), nullable=True),
    sa.Column('data', sa.JSON(), nullable=True),
    sa.ForeignKeyConstraint(['template_id'], ['cardtemplate.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cards')
    op.drop_table('cardtemplate')
    # ### end Alembic commands ###
