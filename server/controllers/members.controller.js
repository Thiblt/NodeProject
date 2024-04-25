const Members = require("../models/members.model");

const MembersController = {
  signin: async (req, res) => {
    try {
      const { email, pwd } = req.body;

      const mem_occ = await Members.findOne({ where: { email: email } });
      if (!mem_occ)
        return res
          .status(409)
          .json({ message: "Error: Member doesn't exists" });

      const compare_pwd = await Members.verifyPassword(pwd, mem_occ.password);
      if (!compare_pwd)
        return res
          .status(409)
          .json({ message: "Error: email/password is incorrect" });

      const token = await Members.refreshToken(mem_occ);

      return res.status(200).json({
        message: "Success: Request successfully completed",
        data: token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error: request was aborted",
      });
    }
  },
  signup: async (req, res) => {
    const { email, pwd, role } = req.body;

    try {
      const mem_occ = await Members.findOne({ where: { email: email } })
        .then((mem_occ) => {
          return mem_occ;
        })
        .catch((error) => {
          console.log(error);
        });
      if (mem_occ)
        return res.status(409).json({ message: "Member already exists" });

      const pwd_hash = await Members.hashPassword(pwd);
      const member = await Members.create({
        email: email,
        password: pwd_hash,
        role: role || "user",
      }).catch((error) => {
        console.log(error);
        return res.status(403).json({ message: "Member can't be created" });
      });

      const token = await Members.refreshToken(member);

      return res.status(200).json({
        message: "Success: Request successfully completed",
        data: token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error: request was aborted",
      });
    }
  },
  access: async (req, res) => {
    const member_id = req.member.id;
    const mem_occ = await Members.findOne({ where: { id: member_id } });
    if (!mem_occ)
      return res.status(404).json({ message: "Error: Member doesn't exists" });

    const access = await Members.accessToken(mem_occ);

    return res.status(200).json({
      message: "Success: Request successfully completed",
      data: access,
    });
  },
  delete: async (req, res) => {
    const member_id = req.member.id;

    const mem_occ = await Members.findOne({ where: { id: member_id } });
    if (!mem_occ)
      return res.status(404).json({ message: "Error: Member doesn't exists" });

    try {
      await Members.destroy({
        where: {
          id: member_id,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Success: Request successfully completed",
        });
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error: request was aborted",
      });
    }
  },
};

module.exports = MembersController;
